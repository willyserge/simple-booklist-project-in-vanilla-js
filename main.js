const form=document.querySelector('#book-form');
const table_body=document.querySelector('#book-list');

//displaying books on the ui

function getBooks(data,bookId){
   
   const row=document.createElement('tr');
   row.setAttribute('id',bookId);
   row.innerHTML=`<td>${data.title}</td>
                    <td>${data.author}</td>
                    <td><a class='delete'>X</a></td>
                    `;

    table_body.appendChild(row);

};

//getting books from the database

db.collection('book').get().then((snapshot)=>{
   snapshot.docs.forEach((doc)=>{
    
    const data=doc.data();
    const bookId=doc.id;
    getBooks(data,bookId);

   })
}).catch((err)=>{
  console.log(err);
});

//adding books

form.addEventListener('submit',(e)=>{
  e.preventDefault();
 const addBook={
  title:form.title.value,
  author:form.author.value
 }
 db.collection('book').add(addBook).then(()=>{
  console.log('recipe has been added');
 }).catch((err)=>{
  console.log(err);
 })

});

//delete from the database
table_body.addEventListener('click',(e)=>{
  if (e.target.className==='delete') {
    const id=e.target.parentElement.parentElement.getAttribute('id');
    db.collection('book').doc(id).delete();
  }
})

