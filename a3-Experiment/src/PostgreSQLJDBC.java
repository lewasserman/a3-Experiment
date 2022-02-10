import java.sql.Connection;
import java.sql.*;

import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.DriverManager;
import java.sql.ResultSet;

public class PostgreSQLJDBC {
//   public static void main(String args[]) {
      static Connection c = null;
      Statement stmt = null;
//      try {
//         Class.forName("org.postgresql.Driver");
//         String dbUsername = System.getenv("dvdbUsername");
//         String dbPassword = System.getenv("dvdbPassword");
//         c = DriverManager
//            .getConnection("jdbc:postgresql://localhost:5432/dv",
//            dbUsername, dbPassword);
//         System.out.println("Opened database successfully");
//         
//         stmt = c.createStatement();
//         String sql = "CREATE TABLE Participant " +
//            "(particpantId VARCHAR(26) PRIMARY KEY     NOT NULL)";
//         stmt.executeUpdate(sql);
//         stmt.close();
//
//         stmt = c.createStatement();
//         sql = "CREATE TABLE Trial " +
//            "(trialId VARCHAR(26) PRIMARY KEY     NOT NULL," +
//            " truePerct      INT     NOT NULL, " +
//            " repPerct       INT     NOT NULL, " +
//            " type           VARCHAR(50), " +
//            " particpantId   VARCHAR(26), " +
//            "CONSTRAINT fk_particpantId" + 
//            "      FOREIGN KEY(particpantId) " + 
//            "	  REFERENCES Participant(particpantId))";
//         stmt.executeUpdate(sql);
//         stmt.close();
//         c.close();
//      } catch (Exception e) {
//         e.printStackTrace();
//         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//         System.exit(0);
//      }
//      System.out.println("Tables created successfully");
//   }
   
   protected static Connection connect() throws Exception {
	   if (c != null) { return c; }
	   
	   try {
         Class.forName("org.postgresql.Driver");
         String dbUsername = System.getenv("dvdbUsername");
         String dbPassword = System.getenv("dvdbPassword");
         c = DriverManager
            .getConnection("jdbc:postgresql://localhost:5432/dv",
            dbUsername, dbPassword);
         System.out.println("Opened database successfully");
         return c;
	   } catch (Exception e) {
         e.printStackTrace();
         System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//         System.exit(0);
         throw new Exception("Failed in database connection");
      }
   }
//   }
}