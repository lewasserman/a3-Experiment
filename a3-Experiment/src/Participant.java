import java.util.UUID;

public class Participant {
	public final String participantId;
	
	public String getParticipantId() {return participantId;}
	
	public Participant(String participantId) {
		this.participantId = participantId;
	}
	
	public Participant() {
		this.participantId = UUID.randomUUID().toString();
	}
	
	public boolean equals(Object o) {
		if (o == null) { return false; }
		
		if (o instanceof Participant) {
			Participant other = (Participant) o;
			return participantId.equals(other.participantId);
		}
		
		return false;  // not a Constant
	}
	
	public String toString() {
		return "Participant " + participantId;
	}
}
