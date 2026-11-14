# AICS Learning Intelligence Dashboard — PRD

## Product vision

An approachable, privacy-first learning dashboard for Artificial Intelligence and Cybersecurity students. It turns a small set of study signals into an explainable weekly action plan so learners can spend their next session on the topic that needs it most.

## Problem

Students frequently track course completion but do not know which subject deserves attention next. Generic productivity dashboards show activity, not learning risk.

## Target user

An undergraduate AICS learner managing theory-heavy courses, programming practice, and exam preparation.

## MVP goals

1. Show meaningful study momentum at a glance.
2. Surface weak topics with transparent scores and reasons.
3. Produce a realistic weekly learning plan.
4. Make all interactions run locally in the browser; no personal data is sent to a server.

## Core features

- **Learning pulse:** focus hours, completed sessions, active streak, and readiness score.
- **Course confidence map:** confidence, mastery, assessment signal, and recommended next action for each topic.
- **Priority engine:** ranks topics using low confidence, declining recall, and upcoming assessment weight.
- **Weekly plan builder:** lets a learner mark plan blocks complete and regenerates a balanced plan.
- **Reflection input:** accepts a topic, confidence rating, and study minutes; stores progress in browser local storage.
- **Explainability:** every priority card states why it was selected.

## Non-goals for MVP

- No claims of academic prediction accuracy.
- No institution data integration, grading integration, authentication, or cloud data storage.
- No replacement for faculty guidance or academic advising.

## Success criteria

- A first-time visitor can understand the learning priority in under one minute.
- A learner can add a reflection and see the dashboard update without an account.
- The project is responsive, keyboard-friendly, and deployable as a static website.

## Privacy and safety

Data stays in the browser via `localStorage`. Demo values are fictional. The dashboard explains its recommendations and labels the tool as an educational prototype.

## Future roadmap

1. CSV import/export controlled by the user.
2. Spaced-repetition reminders.
3. On-device models for lightweight trend analysis.
4. Optional calendar integration after a privacy review.


