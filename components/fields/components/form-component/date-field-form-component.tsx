import { FormElementInstance, SubmitFunction } from "@/components/form-elements";
import { CustomInstance } from "../../date-field";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import DateFieldFormElement from "../../date-field";

interface IProps {
	elementInstance: FormElementInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}

export default function DateFieldFormComponent({ elementInstance, submitValue, isInvalid, defaultValue }: IProps) {
	const element = elementInstance as CustomInstance;
	const { label, helperText, required } = element.extraAttributes;
	const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		setError(isInvalid === true);
	}, [isInvalid]);

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label className={cn(error && "text-red-500")}>
				{label} {required && "*"}
			</Label>
			<Popover>
				<PopoverTrigger>
					<Button
						variant={"outline"}
						className={cn(
							"w-full justify-start text-left font-normal",
							!date && "text-muted-foreground ",
							error && "border-red-500"
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date ? format(date, "PPP") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent>
					<Calendar
						mode="single"
						selected={date}
						onSelect={date => {
							setDate(date)
							if (!submitValue) return;
							const value = date?.toUTCString() || ""
							const valid = DateFieldFormElement.validate(element, value); 
							setError(!valid); 
							submitValue(element.id, value)
						}}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			{helperText && <p className={cn("text-muted-foreground text-[0.8rem]", error && "text-red-500")}>{helperText}</p>}
		</div>
	);
}
