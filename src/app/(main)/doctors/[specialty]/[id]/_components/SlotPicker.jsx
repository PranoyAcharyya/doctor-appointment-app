"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const SlotPicker = ({ days, onSelectedSlot }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const firstDaywithslots =
    days.find((day) => day.slots.length > 0)?.date || days[0]?.date;
  const [activeTab, setactiveTab] = useState(firstDaywithslots);
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const confirmSelection = () => {
    if (selectedSlot) {
      onSelectedSlot(selectedSlot);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs
        defaultValue={activeTab}
        onValueChange={setactiveTab}
        className="w-full"
      >
        <TabsList className={"w-full justify-start "}>
          {days.map((day) => (
            <TabsTrigger
              key={day.date}
              value={day.date}
              disabled={day.slots?.length === 0}
              className={
                day.slots?.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              }
            >
              <div className="flex gap-2">
                <div className="opacity-80">
                  {format(new Date(day.date), "MMM d")}
                </div>
                <div>({format(new Date(day.date), "EEE")})</div>
              </div>
              {day.slots.length > 0 && (
                <div className="ml-2 bg-emerald-900/30 text-emerald-400 text-xs px-2 py-1 rounded">
                  {day.slots.length}
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        {days.map((day) => (
          <TabsContent key={day.date} value={day.date} className={"pt-4"}>
            {day.slot?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No slots available for now
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-xl font-medium">{day.displayDate}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {day.slots.map((slot) => (
                    <Card
                      key={slot.startTime}
                      className={`border-emerald-900/20 cursor-pointer transition-all ${
                        selectedSlot?.startTime === slot.startTime
                          ? "bg-emerald-900/30 border-green-400"
                          : "hover:border-emerald-700/40"
                      }`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      <CardContent className="p-3 flex items-center">
                        <Clock
                          className={`h-4 w-4 mr-2 ${
                            selectedSlot?.startTime === slot.startTime
                              ? "text-emerald-400"
                              : "text-muted-foreground"
                          }`}
                        />
                        <span
                          className={
                            selectedSlot?.startTime === slot.startTime
                              ? "text-white"
                              : "text-muted-foreground"
                          }
                        >
                          {format(new Date(slot.startTime), "h:mm a")}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      <div className="flex justify-end">
        <Button onClick={confirmSelection} disabled={!selectedSlot}>
          Continue
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SlotPicker;
