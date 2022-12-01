# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] 2022-11-30

### Changed

- quiet down helpers when generated.css is not found on disk

### Fixed

- update Architect dependencies including @architect/functions v5.3.1 bugfix

## [2.0.0] 2022-11

### Added

- `getStyles` helpers -- this is the preferred way to get a link tag, style tag, or css URL
- /enhance-styles.css endpoint

### Changed

- a `styles.css` file is no longer written to the consumer's ./public/ directory
- instead a ./tmp folder is used for builds and hydrated to handler functions with [Architect's `hydrate.copy` plugin API](https://arc.codes/docs/en/guides/plugins/hydrate)

## [1.0.0]

### Added

- Sandbox watcher
- Latest version of `enhance-styles`

## [0.0.10] - 2022-08-10
