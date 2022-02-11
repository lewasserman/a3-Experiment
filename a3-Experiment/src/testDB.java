
public class testDB {
	public static void main(String args[]) {
		dvDAO dao = new dvDAO();
		
		try {
			dao.dropTables();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			dao.createTables();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//add new participant 
		Participant p1 = new Participant();
		try {
			dao.createParticipant(p1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//add new participant 
		Participant p2 = new Participant();
		try {
			dao.createParticipant(p2);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//add new trial for that participant
		Trial t1 = new Trial(50, 60, "bar", p1.participantId);
		try {
			dao.createTrial(t1);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//add new trial for that participant
		Trial t2 = new Trial(80, 90, "bar", p2.participantId);
		try {
			dao.createTrial(t2);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		System.out.println("p1.participantId: " + p1.participantId);
		System.out.println("p2.participantId: " + p2.participantId);
		
		//get all trials
		try {
			dao.getAllTrials();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		//get trials for the first participant
		try {
			dao.getTrials(p1.participantId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
}
