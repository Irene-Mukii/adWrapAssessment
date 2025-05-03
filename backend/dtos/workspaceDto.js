class WorkspaceDto {
  constructor({ id, name, email, address, location }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.address = address;
    this.location = location;
  }
}

module.exports = WorkspaceDto;