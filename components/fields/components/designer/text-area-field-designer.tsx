import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../../text-area-field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextAreaFieldDesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CustomInstance;
	const { label, placeholder, helperText, required } = element.extraAttributes;

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label>
				{label} {required && "*"}
			</Label>
			<Textarea rows={1} readOnly disabled placeholder={placeholder} />
			{helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
		</div>
	);
}
