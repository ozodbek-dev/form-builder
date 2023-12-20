import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import { CustomInstance } from "../../spacer-field";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
}

export default function SpacerFieldFormComponent({ elementInstance }: IProps) {
	const element = elementInstance as CustomInstance;
	const { height } = element.extraAttributes;
	return <div style={{ height, width:"100%" }}></div>;
}
