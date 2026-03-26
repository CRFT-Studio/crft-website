import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import * as React from "react";

export function MobileNav() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div
          id="mobileNavBtn"
          className="w-8 aspect-square border-[1px] bg-neutral-900/35 border-neutral-600 p-2 flex flex-col justify-center gap-1 lg:hidden cursor-pointer"
        >
          <div className="h-[1px] w-full bg-neutral-400"></div>
          <div className="h-[1px] w-full bg-neutral-400"></div>
          <div className="h-[1px] w-full bg-neutral-400"></div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="square-card p-6 rounded-b-none border-none border-t-0">
          <div className="flex flex-col gap-2 font-normal">
            <a href="/" className="flex flex-row justify-between items-center">
              <div className="text-lg">Go home</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <div className="h-[1px] w-full bg-neutral-700 my-3"></div>
            <a href="/#services" className="flex flex-row justify-between items-center">
              <div className="text-lg">Services</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <a href="/customers" className="flex flex-row justify-between items-center">
              <div className="text-lg">Customers</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <a href="/about-us" className="flex flex-row justify-between items-center">
              <div className="text-lg">About Us</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <a href="/pricing" className="flex flex-row justify-between items-center">
              <div className="text-lg">Pricing</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <a href="/glossary" className="flex flex-row justify-between items-center">
              <div className="text-lg">Glossary</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <Drawer>
              <DrawerTrigger asChild>
                <button className="flex flex-row justify-between items-center w-full text-left">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="text-lg">CRFT Lookup</div>
                    <div className="square-card px-2 py-0 bg-neutral-700">New</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
                </button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="square-card p-6 rounded-b-none border-none border-t-0">
                  <div className="flex flex-col gap-2 font-normal">
                    <div className="text-lg font-medium">CRFT Lookup</div>
                    <div className=" text-neutral-300 mb-4">
                        All the info we look for in websites, consolidated. See the tech stack, pagespeed, sitemap and meta tags of the sites you're curious about.
                    </div>
                    <a href="/lookup/gallery" className="flex flex-row justify-between items-center">
                      <div className="text-lg">Gallery</div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
                    </a>
                    <a href="/lookup#features" className="flex flex-row justify-between items-center">
                      <div className="text-lg">Features</div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
                    </a>
                    <a href="/lookup/alternatives" className="flex flex-row justify-between items-center">
                      <div className="text-lg">Comparisons</div>
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
                    </a>
                    <a href="/lookup" className="primary-cta text-base text-center font-medium mt-5 mb-2">Scan a Website</a>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
            <div className="h-[1px] w-full bg-neutral-700 my-3"></div>
            <a href="/#faq" className="flex flex-row justify-between items-center">
              <div className="text-lg">FAQ</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <a href="/blog" className="flex flex-row justify-between items-center">
              <div className="text-lg">Blog</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <a href="https://billing.stripe.com/p/login/8wM5mq6kH2nvgx2aEE" target="_blank" className="flex flex-row justify-between items-center">
              <div className="text-lg">Manage Billing</div>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m517.85-480-184-184L376-706.15 602.15-480 376-253.85 333.85-296l184-184Z"/></svg>
            </a>
            <a href="/contact-us" className="primary-cta text-base text-center font-medium mt-5 mb-2">Work with Us</a>
            <a href="/audit" className="text-center text-base">Get Free Hero Redesign</a>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
