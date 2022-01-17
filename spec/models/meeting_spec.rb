
require 'rails_helper'

RSpec.describe Meeting, type: :model do

    let(:meeting) {build(:meeting)}

    it { is_expected.to belong_to(:room) }

    it { is_expected.to validate_presence_of :starts_at }
    it { is_expected.to validate_presence_of :ends_at }
end