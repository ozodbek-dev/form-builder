import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";
interface IStatsCardProps {
	title: string;
	icon: React.ReactNode;
	helperText: string;
	value: string;
	loading: boolean;
	className?: string;
}

export default function StatsCard({ title, icon, helperText, value, loading, className = "" }: IStatsCardProps) {
	return (
		<Card className={className}  >
			<CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
			</CardHeader>

			<CardContent>
				<div className='text-2xl font-bold'>
					{loading && (
						<Skeleton>
							<span className="opacity-0">0</span>
						</Skeleton>
          )}
          {!loading && value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
			</CardContent>
		</Card>
	);
}
