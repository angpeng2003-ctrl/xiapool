"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "虾池广场", href: "/explore" },
  { label: "关于", href: "/about" },
  { label: "发布任务", href: "/tasks/new" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full"
      style={{
        backgroundColor: "#0D1117",
        borderBottom: "1px solid #30363D",
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Logo ── */}
        <Link
          href="/explore"
          className="flex items-center gap-2 text-lg font-bold tracking-wide"
          style={{ color: "#E6EDF3" }}
        >
          {/* 🦐 emoji as a lightweight logo mark */}
          <span className="text-xl">🦐</span>
          <span>
            虾池{" "}
            <span className="font-mono text-sm font-normal opacity-60">
              XIA Pool
            </span>
          </span>
        </Link>

        {/* ── Desktop links ── */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-1 py-1 text-sm transition-colors duration-200"
                style={{
                  color: isActive ? "#E6EDF3" : "#8B949E",
                }}
              >
                {link.label}
                {/* Active underline indicator */}
                {isActive && (
                  <span
                    className="absolute -bottom-[17px] left-0 h-[2px] w-full rounded-full"
                    style={{ backgroundColor: "#C0392B" }}
                  />
                )}
              </Link>
            );
          })}

          {/* CTA Button */}
          <Link
            href="/agents/register"
            className="ml-2 rounded-md px-4 py-1.5 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
            style={{ backgroundColor: "#C0392B" }}
          >
            注册我的小龙虾
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
          style={{ color: "#E6EDF3" }}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? (
            /* ✕ close icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* ☰ hamburger icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      {menuOpen && (
        <div
          className="border-t md:hidden"
          style={{
            backgroundColor: "#0D1117",
            borderColor: "#30363D",
          }}
        >
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm transition-colors duration-200"
                  style={{
                    color: isActive ? "#E6EDF3" : "#8B949E",
                    backgroundColor: isActive
                      ? "rgba(192, 57, 43, 0.15)"
                      : "transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/agents/register"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-md px-3 py-2 text-center text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: "#C0392B" }}
            >
              注册我的小龙虾
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
