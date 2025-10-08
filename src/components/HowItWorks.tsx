"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Search,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Users,
  Shield,
  Clock,
  Star,
  ArrowLeft,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "@/contexts/LocaleContext";
import { cn } from "@/lib/utils";

export default function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const { isRTL, locale } = useLocale()


  const steps = [
    {
      id: 1,
      title: t("steps.step1.title"),
      description: t("steps.step1.description"),
      icon: Search,
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      features: [
        t("steps.step1.features.smartSearch"),
        t("steps.step1.features.categoryBrowsing"),
        t("steps.step1.features.locationResults"),
      ],
    },
    {
      id: 2,
      title: t("steps.step2.title"),
      description: t("steps.step2.description"),
      icon: MessageCircle,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      features: [
        t("steps.step2.features.directMessaging"),
        t("steps.step2.features.videoConsultations"),
        t("steps.step2.features.profileReviews"),
      ],
    },
    {
      id: 3,
      title: t("steps.step3.title"),
      description: t("steps.step3.description"),
      icon: CheckCircle,
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      features: [
        t("steps.step3.features.projectCompletion"),
        t("steps.step3.features.qualityAssurance"),
        t("steps.step3.features.reviewSystem"),
      ],
    },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: t("stats.activeUsers") },
    { icon: Shield, value: "99.9%", label: t("stats.verifiedProfessionals") },
    { icon: Clock, value: "< 24hrs", label: t("stats.responseTime") },
    { icon: Star, value: "4.8/5", label: t("stats.averageRating") },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("title.part1")}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              {t("title.part2")}
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={step.id} className="relative">
                <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-800">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-6xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-blue-200 dark:group-hover:text-blue-800 transition-colors">
                        0{step.id}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="space-y-2">
                      {step.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${step.color}`} />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}
                  />
                </Card>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden lg:block absolute top-1/2 transform -translate-y-1/2 z-20",
                      isRTL ? "-left-4" : "-right-4"
                    )}
                  >
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-700">
                      {isRTL ? (
                        <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("statsSection.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("statsSection.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
