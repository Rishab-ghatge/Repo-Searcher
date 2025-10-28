⚙️ How to Install, Run, Test and Build

1️⃣ Installation

      Clone this repository and install the dependencies:
      
      git clone https://github.com/<your-username>/repo-searcher.git
      
      cd repo-searcherr
      
      npm install

  
2️⃣ Run the Project

    Start the development server:
    
    npm start
    
    Now open http://localhost:3000 in your browser to see the app.

3️⃣ Test (Optional)

    Run the test command:
    
    npm test
    
    Currently, no automated tests are added, but this command is ready for future test cases.

4️⃣ Build for Production

    To create a production-ready build:
    
    npm run build
    
    This will generate a /build folder that can be deployed anywhere (Vercel, Netlify, etc.).

💡 Decisions, Trade-offs, and Next Steps

   🧠 Decisions
  
        Used React with TypeScript for type safety and maintainable code.
        
        Chose Axios for simple and clean API calls.
        
        Used localStorage to save bookmarks so they stay even after reloads.
        
        Added debouncing to avoid unnecessary API calls while typing.
        
        Focused on performance and simplicity instead of adding heavy libraries.
    
   ⚖️ Trade-offs
   
        Bookmarks are stored locally, so they don’t sync across devices.
        
        GitHub’s API doesn’t support fetching multiple repo IDs at once, so bookmarked repos are fetched one by one.
        
        UI is minimal by design to save time and focus on logic quality.

   🚀 Possible Next Steps
   
      Add pagination or infinite scroll for search results.
      
      Let users sort or search inside their bookmarked list.
      
      Integrate GitHub OAuth to sync real starred repositories.

   🌐 Deployed Demo
   
    The project is deployed on Vercel:
    
    👉 https://repo-searcher-chi.vercel.app
