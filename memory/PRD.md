# Veracity Technologies Landing Page - PRD

## Original Problem Statement
Build a landing page for Veracity Technologies, a construction-focused MSP in Minneapolis-St. Paul. Includes Hero, Stats, Why Specialized IT, Our Approach, Compliance, Case Study, Free Audit Offer form, Risk Reversal, FAQs, and Footer.

## User Personas
- Construction company owners/executives looking for IT solutions
- IT Directors at construction firms evaluating MSP partners
- Project Managers concerned about job site connectivity and security

## Core Requirements (Static)
- Company: Veracity Technologies
- Phone: (952) 941-7333
- Email: info@veracitytech.com
- Brand colors: Pantone 541 (#003B71), Pantone 314 (#0077B3), White
- Static form mockup (no database storage)
- Single-page landing with 11 sections

## What's Been Implemented (Dec 2025)
- Full landing page with all 11 sections
- Dark theme with Outfit/IBM Plex Sans typography
- Construction imagery from Unsplash/Pexels
- Shadcn Accordion for FAQ section
- Shadcn Input/Button for form
- Mobile responsive navigation with hamburger menu
- Smooth scroll navigation
- CSS animations (fade-in-up, pulse glow)
- All data-testid attributes for testing

## Architecture
- Frontend: React with Tailwind CSS + Shadcn UI
- Backend: FastAPI (minimal, health endpoint only)
- No database usage for this landing page

## Prioritized Backlog
- P0: Complete (all sections implemented and tested)
- P1: SEO meta tags, Open Graph tags
- P2: Contact form backend integration (MongoDB storage + email notification)
- P2: Analytics integration (Google Analytics / PostHog events)
