This is a [Next.js](https://nextjs.org) project using Shadcn UI..

## Getting Started

Clone the repository

```bash
git clone https://github.com/mthomas-io/assignment-springtree.git
```

Install dependencies.
This uses Tailwind 4/ React 19, opt for --legacy-peer-deps if asked as we use the latest shadcn version.

```bash
npm install
```


then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Goals

- [x] Scaffold project with Next.js/ shadcn
- [x] Add page to browse breeds
- [x] Add simple form to filter breed by origin
- [x] Keep filter state in URL
- [x] If filtering, make search field required to demo validation using useActionState hook
- [x] Add details page for breed, paginate cat images of that breed
- [ ] Add voting on details page
- [ ] Change pagination to infinite scroll?