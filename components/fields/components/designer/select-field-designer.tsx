import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../../select-field";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectFieldDesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CustomInstance;
	const { label, placeholder, helperText, required } = element.extraAttributes;

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label>
				{label} {required && "*"}
			</Label>
			<Select>
				<SelectTrigger className='w-full '>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
			</Select>
			{helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
		</div>
	);
}
