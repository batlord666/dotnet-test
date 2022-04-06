# Docker compose Dotnet Core and Microsoft SQL Server example system 

Example docker-compose system, based on .NET Core project and Microsoft SQL Server database (accessed with _Dapper_).

Dotnet Dockerfile and basic Docker setup based on [SoftwareDeveloper.Blog introduction to _Docker_](https://www.softwaredeveloper.blog/multi-project-dotnet-core-solution-in-docker-image) and database initialization based on [SoftwareDeveloper.Blog introduction to MS SQL Server initialized in _Docker_ container](https://www.softwaredeveloper.blog/initialize-mssql-in-docker-container).

## Docker-compose up
if you want to see this example running, you can just type `docker-compose up` from solution directory.

## Docker-compose up -d
If you want run this example but without attaching console, run _docker-compose up_ in detach mode - `docker-compose up -d`.

## Docker-compose up --build
If you have already composed system up, but then changed source code, you need to pass _--build_ parameter, when running _docker-compose up_ next time: `docker-compose up --build`.
Of course it can be used along with detach parameter.

## Docker-compose down
When you want to clean up containers and networks created by _docker-compose_, just type `docker-compose down` from solution directory.

## Check if system works
If you want to see if this example system works properly, install 'hasura' here https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli/.
Run hasura console inside ./hasura and you should be able to view the existing tables through the API or DATA view.


Remember to wait 90 seconds to have DB initialized, due to [the recommended way MS _SQL Server_ need to be initialized](https://www.softwaredeveloper.blog/initialize-mssql-in-docker-container).
If you know that your PC will boot up _SQL Server_ faster than 90 seconds you can decrease this time in _run-initialization.sh_ script.

## Assignment
Extend the database schema with the following:

- A ProductOrderLineItem Table which contains Id, OrderId (integer), ProductId (integer), Quantity (integer), Date (date).

- An AverageNumOrdersPerProductPerWeekDay View (Virtual Table) which accepts an interval of Dates, ProductIds, and dynamically calculates and returns two columns:  Weekday ( 'MON', 'TUE', etc ), AverageQuantity (integer).

Extend this schema with whatever method you think is best, as long as the database is updated upon docker-compose up or docker-compose build

An example query in Hasura > API. Dont worry if the exact names of the variables and tables are not exactly as the example, as long as its clear and intuitive.

```
query GetAverageOrderPerDayPerProduct($start: String!, $end: String!, $id: Int) {
  GetAverageOrderPerDayPerProduct(where: {date: {_gt: $start, _lt: $end}}, Id: {_eq: $id}) {
    Weekday 
    AverageQuantity
  }
}
```

Inorder for Hasura to capture the new tables, metadata needs to be reloaded via the Cog Symbol in the header. Once there, you want to 'Reload all databases'.


Don't worry about seeding these table, I can add dummy data when I test via the hasura console

