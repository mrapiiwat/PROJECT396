CREATE TABLE Driver (
    DriverID SERIAL PRIMARY KEY,
    FName VARCHAR(50),
    LName VARCHAR(50),
    Phone_Number VARCHAR(15),
    Driving_License VARCHAR(50)
);

CREATE TABLE Passenger (
    PassengerID SERIAL PRIMARY KEY,
    FName VARCHAR(50),
    LName VARCHAR(50),
    Phone_Number VARCHAR(15)
);

CREATE TABLE Vehicle (
    VehicleID SERIAL PRIMARY KEY,
    Vehicle_Type VARCHAR(50),
    Model VARCHAR(50),
    License_Plate VARCHAR(20),
    Vehicle_Status VARCHAR(20),
    DriverID INT,
    FOREIGN KEY (DriverID) REFERENCES Driver(DriverID)
);

CREATE TABLE Discount (
    DiscountID SERIAL PRIMARY KEY,
    Discount_Code VARCHAR(50),
    Start_Date DATE,
    End_Date DATE
);

CREATE TABLE Ride (
    RideID SERIAL PRIMARY KEY,
    PassengerID INT,
    DriverID INT,
    Pickup_Location VARCHAR(100),
    Dropoff_Location VARCHAR(100),
    Pickup_Time TIMESTAMP,
    Dropoff_Time TIMESTAMP,
    Price DECIMAL(10, 2),
    Status VARCHAR(20),
    Discount INT,
    FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID),
    FOREIGN KEY (DriverID) REFERENCES Driver(DriverID),
    FOREIGN KEY (Discount) REFERENCES Discount(DiscountID)
);

CREATE TABLE RideConfirmation (
    ConfirmationID SERIAL PRIMARY KEY,
    RideID INT,
    DriverID INT,
    PassengerID INT,
    Confirmation_Status VARCHAR(20),
    Confirmation_Time TIMESTAMP,
    FOREIGN KEY (RideID) REFERENCES Ride(RideID),
    FOREIGN KEY (DriverID) REFERENCES Driver(DriverID),
    FOREIGN KEY (PassengerID) REFERENCES Passenger(PassengerID)
);

CREATE TABLE RideHistory (
    RideHistoryID SERIAL PRIMARY KEY,
    RideID INT,
    Date_Time TIMESTAMP,
    Pickup_Location VARCHAR(100),
    Dropoff_Location VARCHAR(100),
    Distance DECIMAL(10, 2),
    Price DECIMAL(10, 2),
    Ride_Status VARCHAR(20),
    Ride_Rating INT,
    Review TEXT,
    Tip DECIMAL(10, 2),
    Discount_Use INT,
    FOREIGN KEY (RideID) REFERENCES Ride(RideID),
    FOREIGN KEY (Discount_Use) REFERENCES Discount(DiscountID)
);