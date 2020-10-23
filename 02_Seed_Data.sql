USE [BestReads];
GO

set identity_insert [Users] on
insert into Users (Id, DisplayName, Name, Email, Bio, ImageLocation, FirebaseUserId) 
values (1, 'Mandas', 'Amanda', 'test1@a.com', 'Test Bio', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F2%2F2b%2FWelshCorgi.jpeg&f=1&nofb=1', 'mvdtB1K6hofrQjSxdisUpbRnJS82');
insert into Users (Id, DisplayName, Name, Email, Bio, ImageLocation, FirebaseUserId) 
values (2, 'Menna', 'Meredith', 'test2@a.com', 'Test Bio', 'https://robohash.org/nisiautemet.png?size=150x150&set=set1', 'hbZYvEHpXDb9FAPGRHj5BWMpJBy2');