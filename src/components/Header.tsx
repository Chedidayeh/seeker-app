"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { motion } from "motion/react";

export function AppNavbar() {
  const navItems = [
    { name: "Categories", link: "#categories" },
    { name: "Find providers", link: "#find" },
    { name: "How it works", link: "#how-it-works" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <motion.div
            initial={{ opacity: 0, y: -12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full items-center justify-between"
          >
            <motion.a
              href="#"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black">S</span>
              <span className="font-medium text-black dark:text-white">Seeker</span>
            </motion.a>

            <div className="flex-1">
              <NavItems items={navItems} />
            </div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4"
            >
              {/* <ModeToggle /> */}
              <AnimatedThemeToggler className="z-50 text-lg"/>
              <NavbarButton variant="primary">Sign in</NavbarButton>
            </motion.div>
          </motion.div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <motion.a
              href="#"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 mr-2 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black">S</span>
              <span className="font-medium text-black dark:text-white">Seeker</span>
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </motion.div>
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full flex-col gap-4"
            >
              <div className="flex items-center justify-center">
              </div>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign in
              </NavbarButton>
            </motion.div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}



