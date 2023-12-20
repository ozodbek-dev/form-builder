import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../../paragraph-field";
import { Label } from "@/components/ui/label";

export default function ParagrahpFieldDesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CustomInstance;
	const { text } = element.extraAttributes;

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label>Paragraph field</Label>
			<p>{text}</p>
		</div>
	);
}