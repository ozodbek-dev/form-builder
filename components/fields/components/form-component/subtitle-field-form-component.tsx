import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import { CustomInstance } from "../../text-field";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
}

export default function SubTitleFieldFormComponent({ elementInstance }: IProps) {
	const element = elementInstance as CustomInstance;
	const { title } = element.extraAttributes;

	return <p className='text-lg'>{title}</p>;
}
