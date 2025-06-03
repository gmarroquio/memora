# Memora - Share Party Photos Instantly

**Live Site:** [http://memora.party](http://memora.party)

Memora is a web-based platform designed for effortless and real-time photo sharing at parties. Guests can scan a QR code to instantly upload photos to a shared album directly from their mobile browser – no app download or account creation is required for guests. The focus is on simplicity and ease of use, allowing everyone to contribute and relive moments without interrupting the event.

## Key Features

*   **Instant Photo Sharing:** Photos appear in the shared album in real-time.
*   **QR Code Access:** Guests easily join albums by scanning a QR code.
*   **No App Needed:** Fully web-based, works on any modern mobile browser.
*   **No Guest Accounts:** Guests can upload photos without creating an account.
*   **Simple & Intuitive UI:** Designed for quick uploads so you don't miss the party.
*   **Admin Authentication:** Secure account management for album creators.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (React framework for frontend and backend)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Database & Real-time Backend:** [Convex](https://www.convex.dev/)
*   **File Uploads:** [UploadThing](https://uploadthing.com/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **Analytics:** [PostHog](https://posthog.com/)
*   **Payment Processing:** [Stripe](https://stripe.com/)
*   **AI/ML Features:** [Replicate](https://replicate.com/) & [Gemini](https://ai.google.dev/)
*   **Hosting:** [Vercel](https://vercel.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (version 20.19.0 or higher)
*   npm or yarn or pnpm

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/your-username/memora.git
    cd memora
    ```
2.  **Install NPM packages:**
    ```sh
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```
3.  **Set up environment variables:**
    Create a `.env.local` file in the root directory and add your configuration keys:
    ```env
    # Convex
    # Ensure these align with your Convex project setup
    # CONVEX_DEPLOYMENT=your_convex_deployment_url_or_key (if needed)
    NEXT_PUBLIC_CONVEX_URL=your_convex_url

    # UploadThing (for file/image uploads)
    UPLOADTHING_SECRET= # Verify exact name required by SDK
    UPLOADTHING_APP_ID= # Verify exact name required by SDK

    # Clerk (Authentication)
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
    # NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/ (adjust as needed)
    # NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/ (adjust as needed)
    CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

    # Database (Potentially for other purposes if Convex is primary)
    # DATABASE_URL=your_database_connection_string (If migrating from Supabase, this might be relevant initially)
    # PROD_DATABASE_URL=your_production_database_connection_string

    # Stripe (Payment Processing)
    STRIPE_PRODUCT=your_stripe_product_id
    STRIPE_ACCOUNT=your_stripe_account_id
    NEXT_PUBLIC_STRIPE_KEY=your_stripe_publishable_key
    STRIPE_SECRET_KEY=your_stripe_secret_key
    # STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret (Recommended for security)


    # PostHog (Analytics)
    NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
    NEXT_PUBLIC_POSTHOG_HOST=your_posthog_host_url

    # Replicate (AI Model Hosting)
    REPLICATE_API_TOKEN= # Verify exact name required by SDK

    # Gemini (AI Services)
    GEMINI_API_KEY= # Verify exact name required by SDK

    # Local Development
    LOCAL_URL="http://192.168.15.45:3000" # Or your preferred local URL
    NEXT_PUBLIC_APP_URL="http://localhost:3000" # Often useful for API routes, adjust if LOCAL_URL is preferred
    ```
    *Note: Obtain these keys from your respective service dashboards. Please verify the exact environment variable names required by each library/SDK.*

4.  **Run the Convex backend (if local development is supported/needed):**
    Follow Convex documentation for running a local development environment or ensure your deployment is active.
    ```sh
    npx convex dev
    ```

5.  **Run the Next.js development server:**
    ```sh
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or your `LOCAL_URL`) with your browser to see the result.

## Usage

1.  **Album Creation:** The album creator signs up/logs in. They can then create a new event album, which generates a unique QR code.
2.  **Sharing:** The creator shares the QR code with party guests.
3.  **Guest Upload:** Guests scan the QR code using their mobile phone camera. This opens Memora in their browser, directly to the album upload page. They can then select photos from their gallery or take new ones to upload.
4.  **Real-time Viewing:** All uploaded photos appear instantly in the shared album for everyone with access to see.

## Future Enhancements / TODO

*   **Automatic Blog Post Creator:** Develop a feature to automatically generate blog posts, potentially using AI (e.g., Gemini) to summarize event highlights or showcase popular photos from albums.
*   **Database Migration:** Complete migration of any existing data from Supabase to Convex to consolidate the backend and fully leverage Convex's real-time features.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

This project is licensed under the [Creative Commons Attribution-ShareAlike 4.0 International License (CC BY-SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/).

You are free to:
*   **Share** — copy and redistribute the material in any medium or format
*   **Adapt** — remix, transform, and build upon the material
for any purpose, even commercially.

Under the following terms:
*   **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
*   **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license as the original.

See the [full license text](https://creativecommons.org/licenses/by-sa/4.0/legalcode) for more details.

## Contact

Your Name - guilherme@bitos.co

Project Link (GitHub): [https://github.com/gmarroquio/memora](https://github.com/gmarroquio/memora)
