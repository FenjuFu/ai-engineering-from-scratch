use super::*;
pub fn authorize(c: &Call, approval: Option<&mut Approval>) -> Result<(), Error> {
    match decide(c) {
        Decision::Deny => Err(Error::Invalid("policy denied".into())),
        Decision::Allow => Ok(()),
        Decision::ApprovalRequired => {
            let a = approval.ok_or_else(|| Error::Invalid("approval required".into()))?;
            if a.used || a.request != *c {
                return Err(Error::Conflict);
            }
            a.used = true;
            Ok(())
        }
    }
}
