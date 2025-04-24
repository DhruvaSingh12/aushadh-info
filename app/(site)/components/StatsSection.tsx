"use client";

import React from "react";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Activity, Heart, Droplet, Wind, LineChart, Clock, Calendar } from "lucide-react";

export default function StatsSection() {
  return (
    <div className="py-16 my-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Health Monitoring Dashboard</h2>
        <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full border border-border">
          Last updated: Today, 10:45 AM
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Test Analytics */}
        <div className="col-span-2 bg-background border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="text-primary h-5 w-5" />
                <h3 className="text-xl font-semibold">Test Analytics</h3>
              </div>
              <Tabs defaultValue="overall">
                <TabsList>
                  <TabsTrigger value="overall">Overall</TabsTrigger>
                  <TabsTrigger value="blood">Blood Pressure</TabsTrigger>
                  <TabsTrigger value="oxygen">Oxygen</TabsTrigger>
                  <TabsTrigger value="hemoglobin">Hemoglobin</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Heart Rate Monitor */}
              <div className="relative">
                <div className="h-64 w-full flex items-center justify-center">
                  <div className="relative flex flex-col items-center">
                    <div className="text-center mb-4">
                      <div className="flex items-center justify-center gap-1 text-2xl font-bold">
                        <Heart className="text-primary h-5 w-5" />
                        <span className="text-foreground">72</span>
                        <span className="text-sm text-muted-foreground">bpm</span>
                      </div>
                      <div className="text-sm text-muted-foreground">Heart rate</div>
                    </div>
                    <div className="w-36 h-36 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-pulse"></div>
                      <div className="w-28 h-28 rounded-full bg-background border-8 border-primary/30 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border border-primary/10"></div>
                        <div className="flex flex-col items-center">
                          <div className="text-3xl font-bold">72</div>
                          <div className="text-xs text-muted-foreground">BPM</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Other Health Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-primary/10 to-background rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <LineChart className="text-primary h-4 w-4" />
                    <div className="text-sm text-muted-foreground">Blood pressure</div>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-lg font-medium">120/80</div>
                    <div className="text-xs text-muted-foreground ml-1">mmHg</div>
                  </div>
                  <div className="mt-2 h-1 bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-accent/10 to-background rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Wind className="text-accent h-4 w-4" />
                    <div className="text-sm text-muted-foreground">Oxygen Saturation</div>
                  </div>
                  <div className="flex items-baseline">
                    <div className="text-lg font-medium">99</div>
                    <div className="text-xs text-muted-foreground ml-1">%</div>
                  </div>
                  <div className="mt-2 h-1 bg-muted overflow-hidden rounded-full">
                    <div className="h-full bg-accent rounded-full" style={{ width: '99%' }}></div>
                  </div>
                </div>
                
                <div className="col-span-2">
                  <div className="bg-gradient-to-br from-secondary/10 to-background rounded-lg p-4 border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <Droplet className="text-secondary h-4 w-4" />
                      <div className="text-sm text-muted-foreground">Hemoglobin</div>
                    </div>
                    <div className="flex items-baseline">
                      <div className="text-lg font-medium">14.5</div>
                      <div className="text-xs text-muted-foreground ml-1">g/dL</div>
                    </div>
                    <div className="mt-2 h-1 bg-muted overflow-hidden rounded-full">
                      <div className="h-full bg-secondary rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium">Medication Management</h4>
                <div className="text-xs text-muted-foreground">
                  <Clock className="inline-block h-3 w-3 mr-1" />
                  Next dose in 2 hours
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MedicationItem 
                  name="Atorvastatin"
                  dosage="10mg - 1 tablet - Bedtime"
                  pillsLeft={29}
                  pillsTotal={30}
                  colorClass="from-primary/20 to-background"
                />
                <MedicationItem 
                  name="Ibuprofen"
                  dosage="400mg - 2 tablets - As needed"
                  pillsLeft={24}
                  pillsTotal={30}
                  colorClass="from-accent/20 to-background"
                />
                <MedicationItem 
                  name="Albuterol"
                  dosage="90mcg - Inhale - As needed"
                  pillsLeft={40}
                  pillsTotal={60}
                  colorClass="from-secondary/20 to-background"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Panel - Summary */}
        <div className="bg-background border border-border rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-primary h-5 w-5" />
              <h3 className="text-xl font-semibold">Schedule</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex gap-2 mb-4 overflow-auto scrollbar-hide py-2">
              {[13, 14, 15, 16, 17, 18, 19].map((day) => (
                <div 
                  key={day}
                  className={cn(
                    "w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                    day === 15 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {day}
                </div>
              ))}
            </div>
            
            <div className="bg-muted/50 rounded-lg p-4 mb-6 border border-border">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-background border border-border overflow-hidden flex-shrink-0">
                  <Image
                    src="/doctor-profile.png"
                    alt="Dr. Selena Whitehead"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <h4 className="font-medium">Dr. Selena Whitehead</h4>
                  <p className="text-sm text-muted-foreground">Today, 12:30 PM</p>
                </div>
                <button className="ml-auto p-2 rounded-full hover:bg-muted transition-colors">
                  <span className="sr-only">More</span>
                  <div className="flex flex-col gap-1">
                    <span className="block w-1 h-1 bg-foreground rounded-full"></span>
                    <span className="block w-1 h-1 bg-foreground rounded-full"></span>
                    <span className="block w-1 h-1 bg-foreground rounded-full"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-auto border-t border-border p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Performance
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray="282.7"
                    strokeDashoffset="70"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <div className="text-3xl font-bold">7.6</div>
                  <div className="text-sm text-muted-foreground">Wellness Score</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                Your score is better than 65% of people around the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MedicationItem({ name, dosage, pillsLeft, pillsTotal, colorClass }: { 
  name: string; 
  dosage: string;
  pillsLeft: number;
  pillsTotal: number;
  colorClass: string;
}) {
  const percentage = (pillsLeft / pillsTotal) * 100;
  
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 border border-border rounded-lg hover:shadow-sm transition-shadow overflow-hidden relative",
      "bg-gradient-to-br", colorClass
    )}>
      <div className="w-10 h-10 rounded-lg bg-background/70 backdrop-blur-sm flex items-center justify-center text-lg font-bold border border-border flex-shrink-0">
        {name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <h5 className="font-medium truncate">{name}</h5>
        <p className="text-xs text-muted-foreground truncate">{dosage}</p>
        <div className="mt-1 flex items-center gap-2">
          <Progress value={percentage} className="h-1.5 flex-1" />
          <span className="text-xs text-muted-foreground">{pillsLeft}</span>
        </div>
      </div>
    </div>
  );
}