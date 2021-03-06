CREATE DATABASE [ThobaDb]
GO

USE [ThobaDB]
GO

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[People](
	[Id] [uniqueidentifier] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Phone] [nvarchar](10) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_People] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
INSERT [dbo].[People] ([Id], [Name], [Phone], [Email]) VALUES ('81a41f54-ef16-41ea-bf38-1868d523bfdc', 'Thoba', '0812345678', 'thoba@test.com')
INSERT [dbo].[People] ([Id], [Name], [Phone], [Email]) VALUES ('9d5d5a9a-2609-4892-876b-2f375352235b', 'Thoba2', '0112345678', 'thoba2@test.com')
INSERT [dbo].[People] ([Id], [Name], [Phone], [Email]) VALUES ('24a83a9f-3b7c-46ac-8987-865fd746954d', 'Thoba3', '0123456789', 'thoba3@test.com')
INSERT [dbo].[People] ([Id], [Name], [Phone], [Email]) VALUES ('ae281165-6228-40b3-b52c-e516cf761fc7', 'Thoba4', '1234567890', 'thoba4@test.com')
ALTER TABLE [dbo].[People] ADD  CONSTRAINT [DF_People_Id]  DEFAULT (newid()) FOR [Id]
GO
