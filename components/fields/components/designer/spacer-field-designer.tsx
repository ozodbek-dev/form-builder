import { FormElementInstance } from "@/components/form-elements";
import { CustomInstance } from "../../spacer-field";
import { Label } from "@/components/ui/label";
import { LuSeparatorHorizontal } from "react-icons/lu";

export default function SpacerFieldDesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CustomInstance;
	const { height } = element.extraAttributes;

	return (
		<div className='flex flex-col gap-2 w-full items-center'>
			<Label>Spacer field: {height}px</Label>
			 <LuSeparatorHorizontal className="h-8 w-8  "/>
		</div>
	);
}