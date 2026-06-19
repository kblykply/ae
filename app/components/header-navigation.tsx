"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  areaNavItems,
  companyNavItems,
  navText,
  serviceNavItems,
  type SiteLanguage,
  type SiteNavItem,
} from "../data/site-navigation";

type HeaderNavigationProps = {
  ariaLabel: string;
  contactHref: string;
  language: SiteLanguage;
  onNavigate?: () => void;
  projectsHref: string;
};

type HeaderNavLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  onNavigate?: () => void;
};

function HeaderNavLink({
  children,
  className,
  href,
  onNavigate,
}: HeaderNavLinkProps) {
  if (href.startsWith("#")) {
    return (
      <a className={className} href={href} onClick={onNavigate}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href} onClick={onNavigate}>
      {children}
    </Link>
  );
}

function DesktopDropdown({
  items,
  label,
  language,
}: {
  items: SiteNavItem[];
  label: string;
  language: SiteLanguage;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={`nav-dropdown${isOpen ? " is-open" : ""}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={dropdownRef}
    >
      <button
        aria-expanded={isOpen}
        className="nav-dropdown-trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        {label}
      </button>
      <div className="nav-dropdown-menu">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            onClick={() => setIsOpen(false)}
          >
            {item.label[language]}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({
  items,
  label,
  language,
  onNavigate,
}: {
  items: SiteNavItem[];
  label: string;
  language: SiteLanguage;
  onNavigate?: () => void;
}) {
  return (
    <details className="mobile-nav-group">
      <summary>{label}</summary>
      <div>
        {items.map((item) => (
          <Link href={item.href} key={item.href} onClick={onNavigate}>
            {item.label[language]}
          </Link>
        ))}
      </div>
    </details>
  );
}

export function HeaderDesktopNavigation({
  ariaLabel,
  contactHref,
  language,
  projectsHref,
}: HeaderNavigationProps) {
  const copy = navText[language];

  return (
    <nav className="desktop-nav" aria-label={ariaLabel}>
      <Link href="/">{copy.home}</Link>
      <DesktopDropdown
        items={serviceNavItems}
        label={copy.services}
        language={language}
      />
      <DesktopDropdown
        items={areaNavItems}
        label={copy.areas}
        language={language}
      />
      <DesktopDropdown
        items={companyNavItems}
        label={copy.about}
        language={language}
      />
      <Link href="/blog">{copy.blog}</Link>
      <HeaderNavLink href={projectsHref}>{copy.projects}</HeaderNavLink>
      <HeaderNavLink href={contactHref}>{copy.contact}</HeaderNavLink>
    </nav>
  );
}

export function HeaderMobileNavigation({
  ariaLabel,
  contactHref,
  language,
  onNavigate,
  projectsHref,
}: HeaderNavigationProps) {
  const copy = navText[language];

  return (
    <nav className="mobile-menu-nav" aria-label={ariaLabel}>
      <Link className="mobile-menu-link" href="/" onClick={onNavigate}>
        {copy.home}
      </Link>
      <MobileGroup
        items={serviceNavItems}
        label={copy.services}
        language={language}
        onNavigate={onNavigate}
      />
      <MobileGroup
        items={areaNavItems}
        label={copy.areas}
        language={language}
        onNavigate={onNavigate}
      />
      <MobileGroup
        items={companyNavItems}
        label={copy.about}
        language={language}
        onNavigate={onNavigate}
      />
      <Link className="mobile-menu-link" href="/blog" onClick={onNavigate}>
        {copy.blog}
      </Link>
      <HeaderNavLink
        className="mobile-menu-link"
        href={projectsHref}
        onNavigate={onNavigate}
      >
        {copy.projects}
      </HeaderNavLink>
      <HeaderNavLink
        className="mobile-menu-link"
        href={contactHref}
        onNavigate={onNavigate}
      >
        {copy.contact}
      </HeaderNavLink>
    </nav>
  );
}
