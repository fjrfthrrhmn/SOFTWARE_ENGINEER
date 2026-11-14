# PLAN TEMPLATE — Implementation Plan

> **IMMUTABLE — TEMPLATE ONLY.**
> AI Agent DILARANG mengubah atau menulis task ke file ini.
>
> Buat PLAN baru untuk setiap task berdasarkan branch aktif:
> - Frontend: `docs/PLAN/frontend/plan-<name>.md`
> - Backend: `docs/PLAN/backend/plan-<name>.md`
>
> PLAN adalah **Living Implementation Contract** yang diperbarui selama eksekusi.

---

# Implementation Plan

**Task:** `<TASK>`
**Status:** `DRAFT | APPROVED | IN PROGRESS | COMPLETE | BLOCKED`
**Created:** `<YYYY-MM-DD>`
**Updated:** `<YYYY-MM-DD>`

## 1. Discovery

- [ ] `AGENTS.md` dan dokumentasi relevan dibaca.
- [ ] Arsitektur dan konvensi proyek diperiksa.
- [ ] Codebase dan reusable patterns diperiksa.
- [ ] API / data contracts diperiksa jika relevan.

**Findings:**
- Relevant files: `<actual paths>`
- Current behavior: `<existing behavior>`
- Dependencies: `<related modules>`
- Limitations: `<existing problems>`

## 2. Task Understanding

- **Problem:** `<what needs to be solved>`
- **Expected Outcome:** `<expected result>`
- **Behavior Changes:** `<system / user behavior>`
- **Out of Scope:** `<excluded changes>`

## 3. Technical Approach

- **Selected Approach:** `<solution and reason>`
- **Architecture:** `<module / component changes>`
- **Data Flow:** `<request to response>`
- **Database / API:** `<required changes or none>`
- **UI / State:** `<relevant changes or none>`
- **Security:** `<relevant considerations>`

## 4. Scope & Constraints

**In Scope:**
- `<required changes>`

**Out of Scope:**
- `<forbidden / unrelated changes>`

**Constraints:**
- `<technical / architectural restrictions>`

## 5. Implementation Phases

### Phase 1 — `<name>`

**Objective:** `<expected result>`

**Files:**
- CREATE: `<paths>`
- MODIFY: `<paths>`
- DELETE: `<paths>`

**Tasks:**
- [ ] `<specific implementation task>`
- [ ] `<specific implementation task>`

**Dependencies:** `<dependencies / none>`

**Validation:**
- [ ] `<verification steps>`

**Completion Criteria:** `<measurable result>`

### Phase 2 — `<name>`

**Objective:** `<expected result>`

**Files:**
- CREATE / MODIFY / DELETE: `<paths>`

**Tasks:**
- [ ] `<specific implementation task>`

**Dependencies:** `<dependencies / none>`

**Validation:**
- [ ] `<verification steps>`

**Completion Criteria:** `<measurable result>`

## 6. File Map

| File | Action | Purpose | Phase |
|---|---|---|---|
| `src/...` | CREATE | `<purpose>` | 1 |
| `src/...` | MODIFY | `<purpose>` | 2 |

## 7. Risks & Validation

| Risk / Edge Case | Impact | Mitigation |
|---|---|---|
| `<potential issue>` | `<impact>` | `<solution>` |

**Required Checks:**
- [ ] Typecheck
- [ ] Lint
- [ ] Tests
- [ ] Build
- [ ] Runtime / UI behavior
- [ ] Security / authorization

## 8. Definition of Done

- [ ] All approved phases completed.
- [ ] Implementation follows approved scope.
- [ ] Relevant validations pass.
- [ ] No unauthorized changes.
- [ ] Existing architecture is preserved.
- [ ] Documentation updated if necessary.

## 9. Execution Log

| Phase | Status | Actual Changes | Validation |
|---|---|---|---|
| 1 | PENDING | `<result>` | `<result>` |
| 2 | PENDING | `<result>` | `<result>` |

**Deviations:** `<approved changes and reasons>`

## 10. Final Report

- **Summary:** `<implementation summary>`
- **Files Changed:** `<actual paths>`
- **Validation:** `<commands and results>`
- **Limitations:** `<known issues>`
- **Remaining Work:** `<unfinished tasks>`
- **Commit:** `<conventional commit message>`

---

# PLAN Rules

1. **PLAN FIRST:** Complete planning before coding.
2. **READ FIRST:** Inspect documentation and codebase; never invent files.
3. **NO CODE:** PLAN mode must not modify source code or dependencies.
4. **EXPLICIT SCOPE:** Define exactly what can and cannot change.
5. **FILE PRECISION:** Specify actual file paths and actions.
6. **PHASED EXECUTION:** Complete and validate each phase sequentially.
7. **MINIMAL CHANGES:** Reuse existing patterns; avoid unnecessary refactoring.
8. **APPROVAL REQUIRED:** Never execute a DRAFT plan.
9. **STOP ON DEVIATION:** Request approval before expanding scope.
10. **KEEP UPDATED:** Record actual changes and validation during execution.

**The approved PLAN is the source of truth for implementation.**