import java.util.UUID;

public class Trial {
	public final String trialId;
	public int truePerct;
	public int repPerct;
	public String type;
	public String participantId;
	
	public String getTrialId() {return trialId;}
	public int getTruePerct() {return truePerct;}
	public int getRepPerct() {return repPerct;}
	public String getType() {return type;}
	public String getParticipantId() {return participantId;}

	public Trial(String trialId, int truePerct, int repPerct, String type, String participantId) {
		this.trialId = trialId;
		this.truePerct = truePerct;
		this.repPerct = repPerct;
		this.type = type;
		this.participantId = participantId;
	}
	
	public Trial(int truePerct, int repPerct, String type, String participantId) {
		this.trialId = UUID.randomUUID().toString();
		this.truePerct = truePerct;
		this.repPerct = repPerct;
		this.type = type;
		this.participantId = participantId;
	}
	
	public Trial() {
		this.trialId = UUID.randomUUID().toString();
		this.truePerct = -1;
		this.repPerct = -1;
		this.type = null;
		this.participantId = null;
	}
	
	public boolean equals(Object o) {
		if (o == null) { return false; }
		
		if (o instanceof Trial) {
			Trial other = (Trial) o;
			return trialId.equals(other.trialId);
		}
		
		return false;  // not a Constant
	}
	
	public String toString() {
		return "Trial: " + trialId + ", participantId: " + participantId;
	}
}
