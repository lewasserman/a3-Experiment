import java.sql.*;
import java.util.ArrayList;

public class dvDAO {
	
	java.sql.Connection c;

    public dvDAO() {

    	try  {
    		c = PostgreSQLJDBC.connect();
    	} catch (Exception e) {
    		c = null;
    	}
    }
    
    public boolean createTables() throws Exception {
    	Statement stmt = null;
    	 try {
           stmt = c.createStatement();
           String sql = "CREATE TABLE Participant " +
              "(participantId VARCHAR(50) PRIMARY KEY     NOT NULL)";
           stmt.executeUpdate(sql);
           stmt.close();
  
           stmt = c.createStatement();
           sql = "CREATE TABLE Trial " +
              "(trialId VARCHAR(50) PRIMARY KEY     NOT NULL," +
              " truePerct      INT     NOT NULL, " +
              " repPerct       INT     NOT NULL, " +
              " type           VARCHAR(50), " +
              " participantId   VARCHAR(50), " +
              "CONSTRAINT fk_participantId" + 
              "      FOREIGN KEY(participantId) " + 
              "	  REFERENCES Participant(participantId))";
           stmt.executeUpdate(sql);
           stmt.close();
//           c.close();
           System.out.println("Tables created successfully");
           return true;
    	 } catch (Exception e) {
           e.printStackTrace();
           System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//           System.exit(0);
           throw new Exception("Failed to create tables");
        }
    }
    
    public boolean createParticipant(Participant p) throws Exception {
    	PreparedStatement stmt = null;
    	 try {
    		 stmt = c.prepareStatement("INSERT INTO Participant (participantId) VALUES (?);");
             stmt.setString(1, p.participantId);
             stmt.execute();
             stmt.close();
//             c.commit();
//             c.close();
	         System.out.println("Participant created successfully");
	         return true;
    	 } catch (Exception e) {
           e.printStackTrace();
           System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//           System.exit(0);
           throw new Exception("Failed to create participant");
        }
    }
    
    public boolean createTrial(Trial t) throws Exception {
    	PreparedStatement stmt = null;
    	 try {
    		 stmt = c.prepareStatement("INSERT INTO Trial (trialId, truePerct, repPerct, type, participantId) VALUES (?,?,?,?,?);");
             stmt.setString(1, t.trialId);
             stmt.setInt(2, t.truePerct);
             stmt.setInt(3, t.repPerct);
             stmt.setString(4, t.type);
             stmt.setString(5, t.participantId);
             stmt.execute();
             stmt.close();
//             c.commit();
//             c.close();
	         System.out.println("Trial created successfully");
	         return true;
    	 } catch (Exception e) {
           e.printStackTrace();
           System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//           System.exit(0);
           throw new Exception("Failed to create trial");
        }
    }
    
    public ArrayList<Trial> getTrials(String participantId) throws Exception {

    	 try {
    		 PreparedStatement ps = c.prepareStatement("SELECT * FROM Trial where participantId=?;");
		     ps.setString(1, participantId);
		     ResultSet resultSet = ps.executeQuery();
		     ArrayList<Trial> trials = new ArrayList<Trial>();
		     while (resultSet.next()) {
		     	trials.add(generateTrial(resultSet));
		     	
		     }
		     resultSet.close();
		     ps.close();
		     System.out.println("In getTrials, trials: " + trials);
		     return trials;
    	 } catch (Exception e) {
           e.printStackTrace();
           System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//           System.exit(0);
           throw new Exception("Failed to get trials for the participant");
        }
    }
    
    public ArrayList<Trial> getAllTrials() throws Exception {

   	 try {
   		 PreparedStatement ps = c.prepareStatement("SELECT * FROM Trial;");
		     ResultSet resultSet = ps.executeQuery();
		     ArrayList<Trial> trials = new ArrayList<Trial>();
		     while (resultSet.next()) {
		     	trials.add(generateTrial(resultSet));
		     	
		     }
		     resultSet.close();
		     ps.close();
		     System.out.println("In getAllTrials, trials: " + trials);
		     return trials;
   	 } catch (Exception e) {
          e.printStackTrace();
          System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//          System.exit(0);
          throw new Exception("Failed to get trials for the participant");
       }
   }
    
    public boolean dropTables() throws Exception {
    	Statement stmt = null;
   	 try {
          stmt = c.createStatement();
          String sql = "DROP TABLE Trial;";
          stmt.executeUpdate(sql);
          stmt.close();
 
          stmt = c.createStatement();
          sql = "DROP TABLE Participant;";
          stmt.executeUpdate(sql);
          stmt.close();
//          c.close();
          System.out.println("Tables dropped successfully");
          return true;
   	 } catch (Exception e) {
          e.printStackTrace();
          System.err.println( e.getClass().getName()+": "+ e.getMessage() );
//          System.exit(0);
          throw new Exception("Failed to drop tables");
       }
   }
    
    private Participant generateParticipant(ResultSet resultSet) throws Exception {
    	String participantId  = resultSet.getString("participantId");
    	return new Participant(participantId); 
    }
    
    private Trial generateTrial(ResultSet resultSet) throws Exception {
    	String trialId  = resultSet.getString("trialId");
    	int truePerct  = resultSet.getInt("truePerct");
    	int repPerct  = resultSet.getInt("repPerct");
    	String type  = resultSet.getString("type");
    	String participantId  = resultSet.getString("participantId");
    	return new Trial(trialId, truePerct, repPerct, type, participantId); 
    }

}
