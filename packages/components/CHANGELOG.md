# @sveltique/components

## 0.4.5

### Patch Changes

- [#32](https://github.com/sveltique/sveltique/pull/32) [`33bd2f3`](https://github.com/sveltique/sveltique/commit/33bd2f3e9d8ddecafe98ce72b060dcdab4b4dd77) Thanks [@novaotp](https://github.com/novaotp)! - Removed `Codeblock` container overflow-hidden

## 0.4.4

### Patch Changes

- [#29](https://github.com/sveltique/sveltique/pull/29) [`817d3f7`](https://github.com/sveltique/sveltique/commit/817d3f769980a5e331dcff5ca957abae2759fe70) Thanks [@novaotp](https://github.com/novaotp)! - `Codeblock`'s pre and code take the full height of the container

## 0.4.3

### Patch Changes

- [#27](https://github.com/sveltique/sveltique/pull/27) [`278de9d`](https://github.com/sveltique/sveltique/commit/278de9de138ec2dca8aac931946eaf2c87f089c2) Thanks [@novaotp](https://github.com/novaotp)! - Exposing ref for components that didn't yet

- [#28](https://github.com/sveltique/sveltique/pull/28) [`e83b2b9`](https://github.com/sveltique/sveltique/commit/e83b2b944423ade47e0a158ef12b6c37279b6700) Thanks [@novaotp](https://github.com/novaotp)! - Components expose `ref` as the correct type

## 0.4.2

### Patch Changes

- [#24](https://github.com/sveltique/sveltique/pull/24) [`6453206`](https://github.com/sveltique/sveltique/commit/64532069767050bf11435d9a903216ca0da3dbc1) Thanks [@novaotp](https://github.com/novaotp)! - `Codeblock` spans now take the full scrollable width

- [#20](https://github.com/sveltique/sveltique/pull/20) [`b2394b0`](https://github.com/sveltique/sveltique/commit/b2394b02dc57d457580b065b3d908313f08e2f2d) Thanks [@dependabot](https://github.com/apps/dependabot)! - chore(deps): bump devalue from 5.1.1 to 5.3.2 in /packages/components

## 0.4.1

### Patch Changes

- [#19](https://github.com/sveltique/sveltique/pull/19) [`51b5943`](https://github.com/sveltique/sveltique/commit/51b59434ec2d9505084923e432ee1f895ed1a711) Thanks [@novaotp](https://github.com/novaotp)! - `Kbd` now applies the `class` attribute when set

## 0.4.0

### Minor Changes

- [#17](https://github.com/sveltique/sveltique/pull/17) [`02a7f9b`](https://github.com/sveltique/sveltique/commit/02a7f9b1ace21d0d11164e8f033ec012d4427419) Thanks [@novaotp](https://github.com/novaotp)! - Added `AspectRatio` component

## 0.3.1

### Patch Changes

- [#16](https://github.com/sveltique/sveltique/pull/16) [`8e2c0fd`](https://github.com/sveltique/sveltique/commit/8e2c0fdf848f0984d3896d2978aa09808d96ffc6) Thanks [@novaotp](https://github.com/novaotp)! - Improved `Label` docs

- [#15](https://github.com/sveltique/sveltique/pull/15) [`4307282`](https://github.com/sveltique/sveltique/commit/43072828aa854bf6e030ea1553f06bedda367901) Thanks [@novaotp](https://github.com/novaotp)! - Fixed `NumberInput`'s constraints enforcement

## 0.3.0

### Minor Changes

- [#14](https://github.com/sveltique/sveltique/pull/14) [`e7cc0ed`](https://github.com/sveltique/sveltique/commit/e7cc0eda9002cbbcc2fc40099f6aa4902251a11a) Thanks [@novaotp](https://github.com/novaotp)! - Added `Label` component + using it in `Field`

- [#13](https://github.com/sveltique/sveltique/pull/13) [`6a16709`](https://github.com/sveltique/sveltique/commit/6a167095b29f56f6ba9dfea3b44fe1c4f9860df0) Thanks [@novaotp](https://github.com/novaotp)! - `Progress` height has been reduced from 1rem to 0.75rem

- [#12](https://github.com/sveltique/sveltique/pull/12) [`7924d57`](https://github.com/sveltique/sveltique/commit/7924d575bd6a88b6f2f683da0f09ae5706036952) Thanks [@novaotp](https://github.com/novaotp)! - `Badge` now includes a `secondary` variant

## 0.2.2

### Patch Changes

- [#11](https://github.com/sveltique/sveltique/pull/11) [`a849dbf`](https://github.com/sveltique/sveltique/commit/a849dbfb1a045df1d5df72f579e3726b1e505a60) Thanks [@novaotp](https://github.com/novaotp)! - Downgraded tailwind-variants from ^2.1.0 to 2.0.1 to fix [class merging issues](https://github.com/heroui-inc/tailwind-variants/issues/258)

## 0.2.1

### Patch Changes

- [#10](https://github.com/sveltique/sveltique/pull/10) [`5f98a42`](https://github.com/sveltique/sveltique/commit/5f98a423ae4a5e55db953522e33957010ddd7570) Thanks [@novaotp](https://github.com/novaotp)! - `CodeBlock` now supports the `containerClass` attribute for styling the outer container

## 0.2.0

### Minor Changes

- [#8](https://github.com/sveltique/sveltique/pull/8) [`288586d`](https://github.com/sveltique/sveltique/commit/288586d93c6127e06adb9bb4acbe37366601f8c0) Thanks [@novaotp](https://github.com/novaotp)! - Exporting types, variants, and variant types for all components.

  BREAKING : `option` is now exported as `selectOption`, `OptionVariants` is now exported as `SelectOptionVariants`

## 0.1.1

### Patch Changes

- Replaced link icon props from css to class

## 0.1.0

### Minor Changes

- Initial project release
