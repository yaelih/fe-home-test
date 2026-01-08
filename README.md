# Home Test

## Architectural Assumptions & Trade-offs
### Routing & Structure

- **Structure**: Since Page A, Page B, and the Result Page were defined as pages, I assumed 3 distinct routes were required.

- **State Management**: Since the Server Action is triggered on Page B (and returns result to it) but the data is needed on the Result Page, I had to choose a mechanism to persist the result across navigation.

**The Trade-offs of Persistence** I evaluated three main approaches for passing the action's result:

1. **URL Search Params**: Simple, but has size limitations and exposes data in the URL.

2. **External Storage (DB/Cache)**: Adds unnecessary complexity for this specific scope.

3. **Cookies**: I chose this as a middle-ground trade-off for this challenge, as it allows server-side access on the Result Page without an external database.  

<br>
  

**The "Ideal" Alternative** If the requirements were more flexible, the best trade-off would be:
- Passing only the raw inputs (name, city) via URL params to the Result Page.

- Triggering the Server Action directly on the Result Page.

- **Benefits**: This avoids temporary storage, simplifies cleanup, and leverages Next.js native features like loading.tsx and error.tsx more effectively.


<br><br>
# Installation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

