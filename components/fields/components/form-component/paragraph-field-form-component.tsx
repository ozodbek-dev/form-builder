import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import { CustomInstance } from "../../paragraph-field";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
}

export default function ParagraphFieldFormComponent({ elementInstance }: IProps) {
	const element = elementInstance as CustomInstance;
	const { text } = element.extraAttributes;

	return <p>{text}</p>;
}
