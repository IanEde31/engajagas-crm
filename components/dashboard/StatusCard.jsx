import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";

export default function StatusCard({ title, value, icon: Icon, iconColor, bgColor, className = "" }) {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{value}</p>
          </div>
          <div className={cn("p-2 rounded-full", bgColor)}>
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
