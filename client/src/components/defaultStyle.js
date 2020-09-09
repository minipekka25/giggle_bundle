export default {
    control: {
     
        fontSize: 14,
        fontWeight: '800',
    },

    '&multiLine': {
        control: {
          
            minHeight: 40,
         
        },
        highlighter: {
            padding: 5,
            border: '1px solid transparent',
            maxHeight: 180,
            overflow:'hidden'
        },
        input: {
            padding: 5,
            border: '1px solid silver',
      
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        },
        input: {
            padding: 1,
            border: '2px inset',
        },
    },

    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 14,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#cee4e5',
            },
        },
    },
}