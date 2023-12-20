import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function SeparatorFieldDesignerComponent() {
	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label>Separator field</Label>
			<Separator />
		</div>
	);
}
