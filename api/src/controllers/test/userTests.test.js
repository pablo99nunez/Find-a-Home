const { Types } = require('mongoose');

describe('createNewUser', () => {
  let UserModelMock;

  beforeAll(() => {
    UserModelMock = {
      findOne: jest.fn(),
      save: jest.fn(),
    };
  });

  beforeEach(() => {
    UserModelMock.findOne.mockReset();
    UserModelMock.save.mockReset();
  });

  it('should create a new user and return it', async () => {
    const user = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
    };
    const newUser = { _id: Types.ObjectId(), ...user };
    UserModelMock.findOne.mockResolvedValue(null);
    UserModelMock.save.mockResolvedValue(newUser);
    const createdUser = await createNewUser(user);
    expect(UserModelMock.findOne).toHaveBeenCalledWith({ email: user.email });
    expect(UserModelMock.save).toHaveBeenCalledWith(new UserModelMock(user));
    expect(createdUser).toEqual(newUser);
  });

  it('should update an existing user and return it', async () => {
    const user = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password',
    };
    const updatedUser = { _id: Types.ObjectId(), ...user, name: 'Jane Smith' };
    UserModelMock.findOne.mockResolvedValue({ ...user, name: 'Jane Smith' });
    UserModelMock.save.mockResolvedValue(updatedUser);
    const createdUser = await createNewUser(user);
    expect(UserModelMock.findOne).toHaveBeenCalledWith({ email: user.email });
    expect(UserModelMock.save).toHaveBeenCalledWith(
      new UserModelMock(updatedUser)
    );
    expect(createdUser).toEqual(updatedUser);
  });
});
