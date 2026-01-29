"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "../Container";
import type { Program } from "@/data/(landing)/programs";

interface ProgramsGridProps {
  programData: Program[];
  onSelectProgram: (id: number) => void;
}

export function ProgramsGrid({ programData, onSelectProgram }: ProgramsGridProps) {
  return (
    <section className="py-8 relative overflow-hidden bg-white">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {programData.map((program) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-0">
                <div className="relative h-48 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white z-10 drop-shadow-lg">
                    {program.title}
                  </h3>
                </div>
                <CardContent className="p-6 relative z-10 bg-white">
                  <p className="text-gray-700 mb-4 font-medium">
                    {program.description}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <span className="mr-2 text-[#b42519] font-bold">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => onSelectProgram(program.id)}
                    className="w-full bg-[#b42519] hover:bg-[#7a160d] text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-full"
                  >
                    Detail Program
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
