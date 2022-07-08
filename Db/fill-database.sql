USE [product-db];
GO

CREATE TABLE ProductOrderLineItem (
	Id INT NOT NULL IDENTITY,
	OrderId INT NOT NULL,
	ProductId INT NOT NULL,
	Quantity INT NOT NULL,
	Date DATE,
	PRIMARY KEY (Id)

);
GO

INSERT INTO [ProductOrderLineItem] (OrderId, ProductId, Quantity, Date)
VALUES 
('1001', '1', 5, '2022-05-27' ),
('1002', '2', 1, '2022-05-27'); 
GO

