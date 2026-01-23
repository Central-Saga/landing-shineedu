"use client";

import {
  subscriptionPlans,
  facilities,
  educationLevels,
} from "@/data/landing/subscription";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { Section } from "../Section";
import { Container } from "../Container";

const Langganan = () => {
  return (
    <Section id="langganan-section">
      <Container className="relative z-10">
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#b42519]">
            Biaya Langganan & Fasilitas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Temukan paket langganan yang tepat untuk mendukung tujuan belajar
            Anda!
          </p>
        </div>

        {/* Paket Langganan Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {subscriptionPlans.map((plan, index) => (
            <Card
              key={index}
              className="relative overflow-hidden transition-all duration-300 bg-white hover:shadow-xl hover:-translate-y-1 flex flex-col h-full p-8"
            >
              <div className="flex flex-col h-full relative">
                <div className="absolute inset-0 bg-[#b42519]/5 opacity-0 hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col h-full space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-4 text-[#b42519]">
                      {plan.name}
                    </h3>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-[#b42519]">
                        Rp {plan.price}
                      </span>
                      <span className="text-gray-600">/{plan.duration}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-600"
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#d2a741] mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-[#b42519] text-white hover:bg-[#7a160d] shadow-md">
                    Pilih Paket
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Biaya Per-jenjang Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#b42519]">
              Biaya Per-jenjang
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {educationLevels.map((level, index) => (
              <Card
                key={index}
                className="text-center transition-all duration-300 bg-white hover:shadow-xl hover:-translate-y-1 p-6"
              >
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto relative">
                    <div className="absolute inset-0 bg-[#b42519]/10 rounded-full blur-xl" />
                    <div className="relative bg-[#b42519] rounded-full flex items-center justify-center w-full h-full shadow-md">
                      <span className="text-3xl">{level.emoji}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-2 text-[#b42519]">
                      {level.level}
                    </h4>
                    <div className="text-lg font-bold text-gray-900">
                      {level.price}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    *Biaya Pendaftaran IDR 35.000 include Material & Bag
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Facilities Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 text-[#b42519]">
            Fasilitas yang Anda Dapatkan
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1].map((groupIndex) => (
              <Card
                key={groupIndex}
                className="transition-all duration-300 bg-white hover:shadow-xl hover:-translate-y-1 p-8"
              >
                <div className="grid grid-cols-1 gap-6">
                  {facilities.slice(groupIndex * 4, (groupIndex + 1) * 4).map((facility, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 group"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#b42519]/10 group-hover:bg-[#b42519]/20 transition-colors">
                          <svg
                            className="w-6 h-6 text-[#b42519]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={facility.icon}
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 text-[#b42519]">
                          {facility.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {facility.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Langganan;
