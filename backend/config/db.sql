USE [BookMovieTickets];

CREATE TABLE [Users] (
    [UserID] INT PRIMARY KEY,
    [Username] NVARCHAR(50) UNIQUE,
    [Password] NVARCHAR(100),
    [Role] NVARCHAR(20) -- 'admin', 'employee', 'customer', 'guest'
);

CREATE TABLE [Customers] (
    [CustomerID] INT PRIMARY KEY,
    [UserID] INT,
    [FullName] NVARCHAR(50),
    [Email] NVARCHAR(30),
    [Phone] NVARCHAR(20),
    [Address] NVARCHAR(255),
    FOREIGN KEY ([UserID]) REFERENCES [Users]([UserID])
);


CREATE TABLE [Cinemas] (
    [CinemaID] INT PRIMARY KEY,
    [Name] NVARCHAR(100),
    [Location] NVARCHAR(255),
    [ProvinceID] INT,
    FOREIGN KEY ([ProvinceID]) REFERENCES [Provinces]([ProvinceID])
);

CREATE TABLE [Provinces] (
    [ProvinceID] INT PRIMARY KEY,
    [ProvinceName] NVARCHAR(50)
);

CREATE TABLE [CinemaHalls] (
    [CinemaHallID] INT PRIMARY KEY,
    [CinemaID] INT,
    [Name] NVARCHAR(100),
    [Capacity] INT,
    FOREIGN KEY ([CinemaID]) REFERENCES [Cinemas]([CinemaID])
);

CREATE TABLE [Movies] (
    [MovieID] INT PRIMARY KEY,
    [Name] NVARCHAR(100),
    [Duration] INT,
    [Description] NVARCHAR(MAX),
    [Poster] NVARCHAR(1000),
    [Trailer] NVARCHAR(1000),
    [ReleaseDate] DATETIME,
    [Actors] NVARCHAR(1000),
    [Directors] NVARCHAR(1000),
    [Genres] NVARCHAR(255),
    [Rating] NUMERIC(2, 1),
    [Image1] NVARCHAR(1000),
    [Image2] NVARCHAR(1000),
    [Image3] NVARCHAR(1000),
    [Image4] NVARCHAR(1000),
    [Language] NVARCHAR(255),
    [Subtitle] NVARCHAR(255),
    [Country] NVARCHAR(255)
);

CREATE TABLE [ShowTimes] (
    [ShowtimeID] INT PRIMARY KEY,
    [MovieID] INT,
    [CinemaHallID] INT,
    FOREIGN KEY ([MovieID]) REFERENCES [Movies]([MovieID]),
    FOREIGN KEY ([CinemaHallID]) REFERENCES [CinemaHalls]([CinemaHallID])
);

CREATE TABLE [TimeFrames] (
    [TimeFrameID] INT PRIMARY KEY,
    [StartTime] DATETIME,
    [EndTime] DATETIME
);

CREATE TABLE [ShowTimeTimeFrameMapping] (
    [ShowtimeID] INT,
    [TimeFrameID] INT,
    PRIMARY KEY ([ShowtimeID], [TimeFrameID]),
    FOREIGN KEY ([ShowtimeID]) REFERENCES [ShowTimes]([ShowtimeID]),
    FOREIGN KEY ([TimeFrameID]) REFERENCES [TimeFrames]([TimeFrameID])
);

CREATE TABLE [CinemaSeats](
    [CinemaSeatID] INT PRIMARY KEY,
    [CinemaHallID] INT,
    [SeatName] NVARCHAR(10),
    [SeatType] NVARCHAR(20), -- 'normal', 'vip', 'deluxe'
    FOREIGN KEY ([CinemaHallID]) REFERENCES [CinemaHalls]([CinemaHallID])
);

CREATE TABLE [Bookings] (
    [BookingID] INT PRIMARY KEY,
    [CustomerID] INT,
    [ShowtimeID] INT,
    [TotalPrice] NUMERIC(10, 2),
    [BookingDate] DATETIME,
    [NumberOfTickets] INT,
    FOREIGN KEY ([CustomerID]) REFERENCES [Customers]([CustomerID]),
    FOREIGN KEY ([ShowtimeID]) REFERENCES [ShowTimes]([ShowtimeID])
);

CREATE TABLE [ShowSeats](
    [ShowSeatID] INT PRIMARY KEY,
    [ShowtimeID] INT,
    [CinemaSeatID] INT,
    [BookingID] INT, -- NULL nếu chưa có người đặt, ngược lại là ID của người đặt
    [SeatStatus] NVARCHAR(20), -- 'available', 'booked', 'sold'
    [Price] NUMERIC(10, 2),
    FOREIGN KEY ([ShowtimeID]) REFERENCES [ShowTimes]([ShowtimeID]),
    FOREIGN KEY ([CinemaSeatID]) REFERENCES [CinemaSeats]([CinemaSeatID]),
    FOREIGN KEY ([BookingID]) REFERENCES [Bookings]([BookingID])
);

CREATE TABLE [Payment](
    [PaymentID] INT PRIMARY KEY,
    [BookingID] INT,
    [PaymentDate] DATETIME,
    [Amount] NUMERIC(10, 2),
    [PaymentStatus] NVARCHAR(20), -- 'pending', 'paid', 'cancelled'
    [PaymentMethod] NVARCHAR(20), -- 'cash', 'credit_card', 'debit_card', 'paypal', 'momo', 'zalo_pay', 'vnpay', 'airpay'
    [PaymentInfo] NVARCHAR(1000),
    [TransactionID] NVARCHAR(100) 
    FOREIGN KEY ([BookingID]) REFERENCES [Bookings]([BookingID])
);