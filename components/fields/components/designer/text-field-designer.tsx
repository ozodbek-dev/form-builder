import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../../text-field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function TextFieldDesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CustomInstance;
	const { label, placeholder, helperText, required } = element.extraAttributes;

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label>
				{label} {required && "*"}
			</Label>
			<Input readOnly disabled placeholder={placeholder} />
			{helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
		</div>
	);
}
