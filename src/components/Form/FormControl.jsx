import Input from "./Input";
import TextArea from './TextArea';


function FormControl(props) {
    const { control } = props;
    switch (control) {
        case 'input': return <Input {...props} />;
        case 'textarea': return <TextArea {...props} />;
        // case 'select': return <Select {...props} />
        default: return null
    }

}

export default FormControl;