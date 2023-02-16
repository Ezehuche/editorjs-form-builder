# Form Builder

## Installation

### Install via NPM or Yarn

Get the package

```shell
npm i --save editorjs-form-builder
```

or

```shell
yarn add editorjs-form-builder
```

Include module in your application

```javascript
import FormBuilder from "editorjs-form-builder";
```

```javascript
const onChange = (data) => {
  console.log(data); // 
};

const initialData = [
    {
        "id": "8Z7TsKEv7e",
        "type": "textQuestion",
        "data": {
            "label": "First Name",
            "help": "",
            "placeholder": "Eg Uche",
            "required": true
        }
    },
    {
        "id": "pCtsEP685y",
        "type": "multipleChoiceQuestion",
        "data": {
            "label": "Countries",
            "help": "",
            "required": false,
            "multipleChoice": false,
            "options": [
                {
                    "id": "d077745e-7cb3-4aaa-a9f6-bd8f60f5578a",
                    "label": "Niger"
                },
                {
                    "id": "722c49bb-1a03-4ae8-b332-2a84c1bcb112",
                    "label": "Ghana"
                },
                {
                    "id": "874a231a-300e-4035-b435-234b502e7523",
                    "label": "Liberia"
                }
            ]
        }
    },
    {
        "id": "7ZcdGLmOCO",
        "type": "emailQuestion",
        "data": {
            "label": "Email",
            "help": "",
            "placeholder": "your email",
            "required": true
        }
    },
    {
        "id": "hcuBk3QFKb",
        "type": "numberQuestion",
        "data": {
            "label": "Age",
            "help": "",
            "placeholder": "",
            "required": true
        }
    }
]

return <FormBuilder onChange={onChange} initialData={initialData} />;
```
