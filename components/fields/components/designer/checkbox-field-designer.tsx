import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../../checkbox-field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxFieldDesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CustomInstance;
	const { label, helperText, required } = element.extraAttributes;
const id = `checkbox-${element.id}`
	return (
		<div className='flex items-top  space-x-2 '>
			<Checkbox id={id} />
			<div className="grid gap-1.5 leading-none">
				<Label>
					{label} {required && "*"}
				</Label>
				{helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
			</div>
		</div>
	);
}
