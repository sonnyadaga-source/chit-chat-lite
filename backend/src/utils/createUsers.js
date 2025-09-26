require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize, User, Section } = require("../models/index");

async function seedUsers() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // Hash sample passwords
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Ensure sections exist
    const love = await Section.findOrCreate({ where: { name: "Section LOVE" }, defaults: { adviser_name: "Mr. Santos" }});
    const hope = await Section.findOrCreate({ where: { name: "Section HOPE" }, defaults: { adviser_name: "Ms. Cruz" }});
    const faith = await Section.findOrCreate({ where: { name: "Section FAITH" }, defaults: { adviser_name: "Mrs. Reyes" }});

    // Coordinator (global)
    await User.findOrCreate({
      where: { username: "coord1" },
      defaults: { password_hash: hashedPassword, role: "coordinator", section_id: null }
    });

    // Advisers
    await User.findOrCreate({
      where: { username: "adv_love" },
      defaults: { password_hash: hashedPassword, role: "adviser", section_id: love[0].id }
    });
    await User.findOrCreate({
      where: { username: "adv_hope" },
      defaults: { password_hash: hashedPassword, role: "adviser", section_id: hope[0].id }
    });
    await User.findOrCreate({
      where: { username: "adv_faith" },
      defaults: { password_hash: hashedPassword, role: "adviser", section_id: faith[0].id }
    });

    // Beadles
    await User.findOrCreate({
      where: { username: "beadle_love" },
      defaults: { password_hash: hashedPassword, role: "beadle", section_id: love[0].id }
    });
    await User.findOrCreate({
      where: { username: "beadle_hope" },
      defaults: { password_hash: hashedPassword, role: "beadle", section_id: hope[0].id }
    });
    await User.findOrCreate({
      where: { username: "beadle_faith" },
      defaults: { password_hash: hashedPassword, role: "beadle", section_id: faith[0].id }
    });

    console.log("✅ Users seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
require("dotenv").config();
const bcrypt = require("bcrypt");
const { sequelize, User, Section } = require("../models/index");

async function seedUsers() {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    // Hash sample passwords
    const hashedPassword = await bcrypt.hash("password123", 10);

    // Ensure sections exist
    const love = await Section.findOrCreate({ where: { name: "Section LOVE" }, defaults: { adviser_name: "Mr. Santos" }});
    const hope = await Section.findOrCreate({ where: { name: "Section HOPE" }, defaults: { adviser_name: "Ms. Cruz" }});
    const faith = await Section.findOrCreate({ where: { name: "Section FAITH" }, defaults: { adviser_name: "Mrs. Reyes" }});

    // Coordinator (global)
    await User.findOrCreate({
      where: { username: "coord1" },
      defaults: { password_hash: hashedPassword, role: "coordinator", section_id: null }
    });

    // Advisers
    await User.findOrCreate({
      where: { username: "adv_love" },
      defaults: { password_hash: hashedPassword, role: "adviser", section_id: love[0].id }
    });
    await User.findOrCreate({
      where: { username: "adv_hope" },
      defaults: { password_hash: hashedPassword, role: "adviser", section_id: hope[0].id }
    });
    await User.findOrCreate({
      where: { username: "adv_faith" },
      defaults: { password_hash: hashedPassword, role: "adviser", section_id: faith[0].id }
    });

    // Beadles
    await User.findOrCreate({
      where: { username: "beadle_love" },
      defaults: { password_hash: hashedPassword, role: "beadle", section_id: love[0].id }
    });
    await User.findOrCreate({
      where: { username: "beadle_hope" },
      defaults: { password_hash: hashedPassword, role: "beadle", section_id: hope[0].id }
    });
    await User.findOrCreate({
      where: { username: "beadle_faith" },
      defaults: { password_hash: hashedPassword, role: "beadle", section_id: faith[0].id }
    });

    console.log("✅ Users seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
