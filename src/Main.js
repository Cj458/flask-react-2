import React from 'react';
import ReactMarkdown from "react-markdown";

function Main({ activeNote, onUpdateNote  }) {

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  if (!activeNote) return <div className="no-active-note">No Active Note</div>;
   return (

    
     <div className="app-main">

        <div className="app-main-note-edit">

          {/*my edit ereaaaaaaaaa: title and textarea */}
          <input 
          type="text"
          id="title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus/>

           <textarea  id="body" 
           placeholder="take your notes here..."
           value={activeNote.body}
           onChange={(e) => onEditField("body", e.target.value)} />


            {/*the submit button */}
            <button className="btn">save</button>
           

        </div>

        <div className="app-main-note-preview">
            
          <h1 className="preview-title">{activeNote.title}</h1>
         
          <ReactMarkdown  className="markdown-preview">{activeNote.body}</ReactMarkdown >
       </div>
   </div>
   );
}

export default Main;