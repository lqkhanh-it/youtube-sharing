#Front End With ViteJS

### Folder Structure

Folder structure should look like this;

```
src/
├── App.test.tsx
├── App.tsx
├── .env
├── main.tsx
├── setupTests.ts
├── test-utils.ts
├── vite-env.d.ts
├── assets
│   ├── %image%.jpg
│   └── %icon%.svg
├── common
│   ├── request.ts
│   └── %util_name%.ts
├── components
│   ├── %components%.tsx
│   ├── %components%.test.tsx
│   └── %components%.scss
├── routes
│   ├── %ModuleName%
│   │   ├── index.tsx
│   │   ├── index.scss
│   │   ├── %ModuleRouteName%
│   │   │   ├── index.tsx
│   │   │   ├── %ModuleRouteName%.test.tsx
│   │   │   └── %ModuleRouteName%.scss
│   │   └── %ModuleRouteName%
│   │       ├── index.tsx
│   │       ├── %ModuleRouteName%.test.tsx
│   │       └── %ModuleRouteName%.scss
│   └── index.tsx (router)
├── store
│   ├── slices
│   │   ├── %module-name%.slice.ts
│   │   └── %module-name%.slice.ts
│   ├── hooks.ts
│   └── index.ts
└── styles
    ├── global.scss
    └── vendors.scss
```
