const data = require("../services/DBadaptor");
const workspaceSchema = require("../schema/workspace");
const userSchema = require("../schema/user");
const wsmemberSchema = require("../schema/wsmember");
const channelSchema = require("../schema/channel");
const directSchema = require("../schema/direct");
const directmessageSchema = require("../schema/directmessage");
const channelmessageSchema = require("../schema/channelmessage");
const crypto = require("crypto");

module.exports = (app) => {
  app.post("/api/create/workspace", async (req, res) => {
    const msdb = data.getDatabaseConnection("black_master");
    const workspace = msdb.model("workspace", workspaceSchema);
    const user = msdb.model("user", userSchema);
    console.log(req.body.workspace_name, req.body.emoji);
    let newWorkspace = new workspace({
      name: req.body.workspace_name,
      created_by: req.user.id,
      emoji: req.body.emoji,
    });

    let createWorkspace = await newWorkspace.save();
    let foundcreatedUser = await user.findOne({ googleId: req.user.id });
    foundcreatedUser.workspaces.push(createWorkspace._id);
    let updatedUser = await foundcreatedUser.save();

    let wsdb = data.getDatabaseConnection(await createWorkspace._id);

    const wsMember = wsdb.model("wsmember", wsmemberSchema);

    let newWsMember = new wsMember({
      nickName: await updatedUser.name,
      email: await updatedUser.email,
      googleId: await updatedUser.googleId,
      profile_pic: await updatedUser.picture,
      Ref: await updatedUser,
      todo: [{ task: "Add Members", emoji: "🤝" }],
      online: false,
      status: "😎",
    });

    await newWsMember.save();

    res.send(createWorkspace);
  });

  app.post("/api/create/channel/onboard", async (req, res) => {
    let wsdb = data.getDatabaseConnection(req.body.workspace_id);

    const channel = wsdb.model("channel", channelSchema);
    const wsMember = wsdb.model("wsmember", wsmemberSchema);
    const direct = wsdb.model("direct", directSchema);

    let createdWsMember = await wsMember.findOne({ googleId: req.user.id });

    let generalchannel = new channel({
      name: "general",
      private: false,
      emoji: "🥴",
      members: [await createdWsMember],
    });

    let randomchannel = new channel({
      name: "random",
      private: false,
      emoji: "👾",
      members: [await createdWsMember],
    });

    let userchannel = new channel({
      name: req.body.channel_name,
      private: false,
      emoji: req.body.emoji,
      members: [await createdWsMember],
    });

    let channelseed = [generalchannel, randomchannel, userchannel];

    let createdchannels = await channel.insertMany(channelseed);

    let id = req.user.id;
    let hash = crypto.createHash("md5").update(id).digest("hex");

    let newDirect = new direct({
      hash: hash,
      members: [await createdWsMember],
    });

    let memberfill = await wsMember.findOne({ googleId: req.user.id });
    await createdchannels.map((i) => {
      memberfill.channels.push(i);
    });

    let directcreated = await newDirect.save();
    await memberfill.directs.push(await directcreated);
    await memberfill.save();

    res.send(req.body.workspace_id);
  });

  app.post('/api/create/joinmessage', async (req, res) => {

        let wsdb = data.getDatabaseConnection(req.body.workspace_id)

        const channel = wsdb.model('channel', channelSchema)
        const wsMember = wsdb.model('wsmember', wsmemberSchema)
        const direct = wsdb.model('direct', directSchema)

        let modelCreator = (collectionname, schema) => {
            return wsdb.model(collectionname, schema)
        }




        let userobj = await wsMember.findOne({ googleId: req.user.id }).populate({ path: 'channels', model: channel }).populate({ path: 'directs', model: direct, populate: { path: 'members', model: wsMember } })

        let joindm = modelCreator('dm-' + userobj.directs[0].hash, directmessageSchema)

        let directmessages = new joindm({
            type: 'text',
            saved: false,
            message: `${userobj.nickName} joined the chat`,
            created_by: await userobj
        })

        let g = await directmessages.save()

        let newdirectupdate = await direct.findOne({ _id: userobj.directs[0]._id })

        newdirectupdate.latest_msg = { msg: g.message, time: g.updatedAt }

        await newdirectupdate.save()

        let msgcreate = async (a) => {
            let channel_name = 'ch-' + a._id;
            let joinchannel = modelCreator(channel_name, channelmessageSchema)
            let channelmessage = new joinchannel({
                type: 'text',
                saved: false,
                message: `${userobj.nickName} joined ${a.name}`,
                created_by: await userobj
            })
            let t = await channelmessage.save()

            let newchannelupdate = await channel.findOne({ _id: a._id })
            newchannelupdate.latest_msg = { msg: t.message, time: t.updatedAt }
            await newchannelupdate.save()
        }

        userobj.channels.map(async (i) => {
            msgcreate(i)
        })

        res.send(userobj)
    })

  app.post("/api/join/workspace", async (req, res) => {
    const msdb = data.getDatabaseConnection("black_master");
    const workspace = msdb.model("workspace", workspaceSchema);
    const user = msdb.model("user", userSchema);
    console.log(req.body.workspace_id);
    let found_workspace = await workspace.findOne({
      _id: req.body.workspace_id,
    });

    let foundUser = await user.findOne({ googleId: req.user.id });
    foundUser.workspaces.push(found_workspace);
    let updatedUser = await foundUser.save();

    let wsdb = data.getDatabaseConnection(await found_workspace._id);
    let modelCreator = (collectionname, schema) => {
      return wsdb.model(collectionname, schema);
    };

    const channel = wsdb.model("channel", channelSchema);
    const wsMember = wsdb.model("wsmember", wsmemberSchema);
    const direct = wsdb.model("direct", directSchema);

    let newWsMember = new wsMember({
      nickName: await updatedUser.name,
      email: await updatedUser.email,
      googleId: await updatedUser.googleId,
      profile_pic: await updatedUser.picture,
      Ref: await updatedUser,
      todo: [{ task: "Have Fun", emoji: "🥳" }],
      online: false,
      status: "😎",
    });

    let createdWsMember = await newWsMember.save();

    let found_channels = await channel.find({ private: false });
    found_channels.map(async (i) => {
      i.members.push(createdWsMember);
      await i.save();
    });

    found_channels.map((i) => {
      createdWsMember.channels.push(i);
    });
    await createdWsMember.save();

    let id = req.user.id;
    let hash = crypto.createHash("md5").update(id).digest("hex");

    let newDirect = new direct({
      hash: hash,
      members: [await createdWsMember],
    });

    let directcreated = await newDirect.save();
    await createdWsMember.directs.push(await directcreated);

    let joindm = modelCreator("dm-" + directcreated.hash, directmessageSchema);

    let directmessages = new joindm({
      type: "text",
      saved: false,
      message: `${createdWsMember.nickName} joined the chat`,
      created_by: await createdWsMember,
    });

    let g = await directmessages.save();

    let newdirectupdate = await direct.findOne({ _id: directcreated._id });

    newdirectupdate.latest_msg = { msg: g.message, time: g.updatedAt };

    await newdirectupdate.save();

    let finalupdate = await createdWsMember.save();

    res.send(finalupdate);
  });
};
